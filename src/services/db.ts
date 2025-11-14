// IndexedDB service for Caçadoras de Hobbies

const DB_NAME = "CacadorasDB";
const DB_VERSION = 1;

export interface Evento {
  id?: number;
  titulo: string;
  data: string;
  descricao: string;
  local: string;
}

export interface Presenca {
  id?: number;
  idEvento: number;
  nomeUsuario: string;
  dataConfirmacao: string;
}

export interface Usuario {
  id?: number;
  username: string;
  password: string;
}

class DatabaseService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores if they don't exist
        if (!db.objectStoreNames.contains("eventos")) {
          const eventosStore = db.createObjectStore("eventos", {
            keyPath: "id",
            autoIncrement: true,
          });
          eventosStore.createIndex("data", "data", { unique: false });
        }

        if (!db.objectStoreNames.contains("presencas")) {
          const presencasStore = db.createObjectStore("presencas", {
            keyPath: "id",
            autoIncrement: true,
          });
          presencasStore.createIndex("idEvento", "idEvento", { unique: false });
        }

        if (!db.objectStoreNames.contains("usuarios")) {
          const usuariosStore = db.createObjectStore("usuarios", {
            keyPath: "id",
            autoIncrement: true,
          });
          usuariosStore.createIndex("username", "username", { unique: true });
          
          // Add default admin user
          const transaction = (event.target as IDBOpenDBRequest).transaction;
          const store = transaction?.objectStore("usuarios");
          store?.add({
            username: "admin",
            password: "admin123",
          });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = "readonly") {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Eventos CRUD
  async addEvento(evento: Evento): Promise<number> {
    const store = this.getStore("eventos", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(evento);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getEventos(): Promise<Evento[]> {
    const store = this.getStore("eventos");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getEvento(id: number): Promise<Evento | undefined> {
    const store = this.getStore("eventos");
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateEvento(evento: Evento): Promise<void> {
    const store = this.getStore("eventos", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(evento);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteEvento(id: number): Promise<void> {
    const store = this.getStore("eventos", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Presenças CRUD
  async addPresenca(presenca: Presenca): Promise<number> {
    const store = this.getStore("presencas", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(presenca);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getPresencas(): Promise<Presenca[]> {
    const store = this.getStore("presencas");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPresencasByEvento(idEvento: number): Promise<Presenca[]> {
    const store = this.getStore("presencas");
    const index = store.index("idEvento");
    return new Promise((resolve, reject) => {
      const request = index.getAll(idEvento);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deletePresenca(id: number): Promise<void> {
    const store = this.getStore("presencas", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Usuários
  async validateUser(username: string, password: string): Promise<boolean> {
    const store = this.getStore("usuarios");
    const index = store.index("username");
    return new Promise((resolve, reject) => {
      const request = index.get(username);
      request.onsuccess = () => {
        const user = request.result as Usuario | undefined;
        resolve(user?.password === password);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new DatabaseService();

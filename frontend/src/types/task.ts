export interface Task {
  id : number;
  title : string;
  description : string | null;
  completed : boolean;
  created_at : string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed? : boolean;
}

export interface UpdateTaskInput {
  title? : string;
  description? : string;
  completed? : boolean;
}
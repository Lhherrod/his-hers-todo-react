export interface AddTodo {
  complete?: boolean;
  description: string;
  whoseTodo: {
    name: string;
  };
  isPublic?: boolean;
}

export interface ReadTodo {
  id: string;
  userId: string;
  complete: boolean;
  description: string;
  whoseTodo: {
    name: string;
  };
  isPublic: boolean;
}

export interface UpdateTodo {
  id: string;
  complete?: boolean;
  description: string;
  whoseTodo: {
    name: string;
  };
}
let instance;

class BoardClient {

    async getBoardConfig () {
      const response = await fetch('http://localhost:8000/api/board/a1');
      const data = await response.json();
      return data;     
    }

    async getTasks () {
      const response = await fetch('http://localhost:8000/api/board/a1/tasks');
      const data = await response.json();
      return data;
    }

    async getTasksByListId () {
      const response = await fetch('http://localhost:8000/api/board/a1/tasks');
      const data = await response.json();
      console.log(data);
      return data;  
    }

    async pushTasks (task) {
      const response = await fetch('http://localhost:8000/api/board/a1/tasks', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      const data = await response.json();
      console.log(data);
    }

    async updateListIdPr (task) {
      const response = await fetch('http://localhost:8000/api/tasks/1', {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      const data =  response.json();
      console.log(data);
      return data;
    }

    updateTaskDescription (task) {
      const existingTask = this.tasks.find(t => t.id === task.id)
      existingTask.description = task.description;
      console.log(this.tasks);
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
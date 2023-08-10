let instance;

class BoardClient {

    async getBoardConfig () {

      const response = await fetch('http://localhost:8000/api/board');
      const data = await response.json();
      return data;     
    }
    /*
    async getTasks (boardId) {
      const response = await fetch(`http://localhost:8000/api/board/${boardId}/tasks`);
      const data = await response.json();
      return data;
    }
    */

    async getTasksByListId (boardId, listId) {

      const response = await fetch(`http://localhost:8000/api/board/${boardId}/tasks/` + listId);
      const data = await response.json();
      return data;  
    }

    async createTasks (boardId, task) {
      const response = await fetch(`http://localhost:8000/api/board/${boardId}/tasks/` + task.listId, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      const data = await response.json();
      console.log(data);
    }

    async updateListData (task) {
      const response = await fetch('http://localhost:8000/api/tasks/' + task.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      const data = await response.json();
      console.log(data);
      return data
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
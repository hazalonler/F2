let instance;

class BoardClient {

    async getBoardConfig () {
      const response = await fetch('http://localhost:8000/api/board');

      return await response.json();
    }

    async getTasksByListId (boardId, listId) {
      const response = await fetch(`http://localhost:8000/api/board/${boardId}/tasks/` + listId);

      return await response.json();
    }

    async createTasks (boardId, task) {
      const response = await fetch(`http://localhost:8000/api/board/${boardId}/tasks/` + task.listId, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });

      return await response.json();
    }

    async updateListData (task) {
      const response = await fetch('http://localhost:8000/api/tasks/' + task.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      
      return await response.json();
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
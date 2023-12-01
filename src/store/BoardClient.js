
const urlCommon = "http://localhost:8000/api"

class BoardClient {

    async getBoardConfig () {
      const response = await fetch(`${urlCommon}/board`);

      return await response.json();
    }

    async getTasksByListId (boardId, listId) {
      const response = await fetch(`${urlCommon}/board/${boardId}/tasks/` + listId);

      return await response.json();
    }

    async createTasks (boardId, task) {
      const response = await fetch(`${urlCommon}/board/${boardId}/tasks/` + task.listId, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });

      return await response.json();
    }

    async updateListData (task) {
      const response = await fetch(`${urlCommon}/tasks/` + task.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      });
      
      return await response.json();
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
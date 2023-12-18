
const urlCommon = "http://localhost:8000/api"

class BoardClient {

    getBoardConfig () {
      return fetch(`${urlCommon}/board`)
        .then((response) => response.json());
    }

    getTasksByListId (boardId, listId) {
      return fetch(`${urlCommon}/board/${boardId}/tasks/` + listId)
        .then((response) => response.json());
    }

    createTasks (boardId, task) {
      return fetch(`${urlCommon}/board/${boardId}/tasks/` + task.listId, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      })
        .then((response) => response.json());
    }

    updateListData (task) {
      return fetch(`${urlCommon}/tasks/` + task.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
      })
        .then((response) => response.json());
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
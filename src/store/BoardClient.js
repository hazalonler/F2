let boardInstance;
let tasksInstance;

class BoardClient {
    constructor() {
      if (boardInstance && tasksInstance) {
        throw new Error("You can only create one board instance and one tasks instance!");
      }
        boardInstance = this.boardConfig = {
          boardName: "Hazal's Project",
          listConfig: [
            {
              id: 'e1', 
              name: "Backlog", 
              style: {backgroundColor: "pink"}
            },
            {
              id: 'e2', 
              name: "To-Do", 
              style: {backgroundColor: "pink"}
            },  
            {
              id: 'e3', 
              name: "In-Progress", 
              style: {backgroundColor: "pink"}
            }, 
            {
              id: 'e4', 
              name: "Done", 
              style: {backgroundColor: "pink"}
            }, 
          ]
        };

        tasksInstance = this.tasks = [
          {
              name: "Prepare a new board",
              date: new Date(2023, 4, 3),
              listId: 'e1',
          },
          {
              name: "Prepare a task list",
              date: new Date(2023, 5, 6),
              listId: 'e2',
          },
          {
              name: "naming",
              date: new Date(2022, 5, 6),
              listId: 'e3',
          },
          {
              name: "Prepare a new board",
              date: new Date(2021, 4, 3),
              listId: 'e5',
          },
          {
              name: "edit",
              date: new Date(2023, 5, 8),
              listId: 'e2',
          },
          {
              name: "Prepare a task list",
              date: new Date(2023, 7, 6),
              listId: 'e3',
          },
          {
            name: "New board task created",
            date: new Date(2019, 4, 3),
            listId: 'e3',
          },
        ];

    }

    getBoardConfig () {
      return boardInstance;
    }

    getTasks () {
      return tasksInstance;
    }

    pushTasks (task) {
      return tasksInstance.concat(task);
    }
};

const boardClient = Object.freeze(new BoardClient());
export default boardClient;
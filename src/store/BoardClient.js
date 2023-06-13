let instance;

class BoardClient {
    constructor() {
      if (instance) {
        throw new Error("You can only create one board instance and one tasks instance!");
      }
      instance = this;
        this.boardConfig = {
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

        this.tasks = [
          {
              id: '1',
              name: "Prepare a new board",
              date: new Date(2023, 4, 3),
              listId: 'e1',
              priorty: 1000,
          },
          { 
              id: '2',
              name: "Prepare a task list",
              date: new Date(2023, 5, 6),
              listId: 'e2',
              priorty: 1000,
          },
          {
              id: '3',
              name: "naming",
              date: new Date(2022, 5, 6),
              listId: 'e3',
              priorty: 1000,
          },
          {
              id: '4',
              name: "Prepare a new board",
              date: new Date(2021, 4, 3),
              listId: 'e3',
              priorty: 2000,
          },
          {
              id: '5',
              name: "edit",
              date: new Date(2023, 5, 8),
              listId: 'e2',
              priorty: 2000,
          },
          {
              id: '6',
              name: "Prepare a task list",
              date: new Date(2023, 7, 6),
              listId: 'e3',
              priorty: 3000,
          },
          {
              id: '7',
              name: "New board task created",
              date: new Date(2019, 4, 3),
              listId: 'e3',
              priorty: 4000,
          },
        ];

    }

    getBoardConfig () {
      return this.boardConfig;
    }

    getTasks () {
      return this.tasks;
    }

    getTasksByListId (listId) {
      const result = this.tasks.filter(task => task.listId === listId).sort((a, b) => a.priorty - b.priorty);
      console.log("getTaskByListId: " + JSON.stringify(result));
      return result;
    }

    pushTasks (task) {
      const newTasks = this.tasks.concat(task);
      console.log(newTasks);
    }

    update (task) {
      const existingTask = this.tasks.find(t => t.id === task.id)
      existingTask.listId = task.listId;
      existingTask.priorty = task.priorty;
      console.log(this.tasks);
    }
};

const singletonBoardClient = Object.freeze(new BoardClient());
export default singletonBoardClient;
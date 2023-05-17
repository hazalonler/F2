class BoardClient {
    constructor() {
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
            name: "Prepare a task list",
            date: new Date(2023, 5, 6),
            listId: 'e3',
        },
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
            name: "Prepare a task list",
            date: new Date(2023, 5, 6),
            listId: 'e3',
        },
      ];

    }

    getBoardConfig () {
        return this.boardConfig;
    }

    getTasks () {
        return this.tasks;
    }
};

export default BoardClient;
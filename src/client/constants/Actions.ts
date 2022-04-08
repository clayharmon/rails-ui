export interface Action {
  label: string;
}

export type Actions = { rake_tasks: Action };

const ACTIONS: Actions = {
  rake_tasks: {
    label: 'Rake Tasks'
  }
};

export default ACTIONS;

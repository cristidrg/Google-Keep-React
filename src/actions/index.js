import { actionType } from '../reducers/notes';

function addNote(noteAttributes) {
  return {
    type: actionType.ADD,
    payload: Object.assign({}, (({ note, title }) => ({ note, title }))(noteAttributes)),
  };
}

export { addNote };
export default addNote;

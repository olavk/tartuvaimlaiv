export default function batchActions(..._actions) {
  // this check enables use of array as first argument
  const actions = _actions[0] instanceof Array ? [..._actions[0]] : _actions;
  return {
    type: 'BATCH_ACTIONS',
    actions,
  };
}

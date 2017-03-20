import createBrowserHistory from 'history/lib/createBrowserHistory';

export default (getUserConfirmation) => (
  createBrowserHistory({
    getUserConfirmation
  })
)

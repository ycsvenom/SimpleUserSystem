# SimpleUserSystem

User System that consists of Server as Backend and Client as Frontend
The Backend was written using [`NodeJS`](https://nodejs.org/en/) and the Frontend in [`ReactJS`](https://reactjs.org/)

the Server is working as API which offers the following methods[^1]:

| Method          | Description       |
|:----------------------------:|:-----------------:|
| `/signup`        | Require `username`,`password`,`fname`,`lname` and `email` and return empty `data` Array when success  |
|  `/login`       | Require `username` and `password` and returns user data with `token` but without the `password`           |
| `/delete-account`   | Require `username`, `password` and `token` and returns empty array if success     |
| `/math-game-score`   | Require `username` and `token` and returns empty `data` Array when success         |
| `/get-scores`   | `username` is optional, if sent with `username` it will return `score` for that specific user, if not then it returns the highest 10 scores          |


[^1]: All API calls should be preprended with `/api`.

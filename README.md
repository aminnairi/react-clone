# react-clone

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/) (Optional)

## Clone

```console
$ git clone https://github.com/aminnairi/react-clone.git
$ cd react-clone
```

## Commands

GNU/Make | Docker Compose | Description
---|---|---
`make start` | `docker-compose up --detach` | Start listening to http://localhost/.
`make stop` | `docker-compose down` | Stop the web server.
`make restart` | `docker-compose down && docker-compose up` | Restart the server.

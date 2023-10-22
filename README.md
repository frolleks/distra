# distra

An open source video sharing site.

## Stack

- [Next.js](https://nextjs.org)
- [drizzle-orm](https://orm.drizzle.team)
- [PostgreSQL](https://www.postgresql.org)
- Amazon S3

## Contributing guide

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) 18.12.x or later
- pnpm
- PostgreSQL database

After you install Node.js, run `corepack enable pnpm` to enable pnpm.

Then, fork and clone the forked repository.

```sh
git clone https://github.com/<your username>/distra
cd distra
```

Then, install the dependencies.

```sh
pnpm i
```

Then, you'd need to have an instance of PostgreSQL running, I won't give you a guide because there's a lot of them. I'd recommend you to use [Docker](https://hub.docker.com/_/postgres) for this.

Then, create a .env file, with the database url inside it.

```env
DATABASE_URL="postgres://postgres:mydbpassword@localhost:5432/postgres
```

And then, run the development server.

```sh
pnpm run dev
```

Happy coding!


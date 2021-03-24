<p align="center">

  <h3 align="center">EngineerX Frontend Microservices</h3>

  <p align="center">
    <a href="https://github.com/HsnVahedi/engineerx-frontend/issues/new">Report bug</a>
    ·
    <a href="https://github.com/HsnVahedi/engineerx-frontend/issues/new">Request feature</a>
  </p>
</p>


## Table of contents

- [Introduction to EngineerX project](#introduction-to-engineerx-project)
- [What's included](#whats-included)
- [Run this project](#run-this-project)
- [EngineerX code repositories](#engineerx-code-repositories)





## Introduction to EngineerX project

EngineerX is an open source web application designed for engineers and specialists. It lets them share their ideas, create tutorials, represent themselves, employ other specialists and ...

Currently, The project is at it's first steps and includes a simple but awesome [Content Management System (CMS)](https://en.wikipedia.org/wiki/Content_management_system) that lets content providers to create and manage blog posts.

Key features of the project:

- It's [cloud native](https://en.wikipedia.org/wiki/Cloud_native_computing) and can easily get deployed on popular cloud providers like (AWS, Azure and ...)
- It benefits from microservices architectural best practices. It uses technologies like [docker](https://www.docker.com/) and [kubernetes](https://kubernetes.io/) to provide a horizontally scalable infrastructure with high availability.
- It includes a wide range of popular development frameworks and libraries like: [django](https://www.djangoproject.com/), [reactjs](https://reactjs.org/), [nextjs](https://nextjs.org/), [wagtail](https://wagtail.io/) and ...
- It benefits from [TDD](https://en.wikipedia.org/wiki/Test-driven_development) best practices and uses [unittest](https://docs.python.org/3/library/unittest.html#module-unittest), [jest](https://jestjs.io/), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) and [cypress](https://www.cypress.io/) for different kinds of tests.
- It uses [Jenkins](https://www.jenkins.io/) declarative pipeline syntax to implement [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipelines. (Pipeline as code)
- Developers are able to write different kinds of tests and run them in a parallelized and non-blocking manner. In other words, testing environment is also elastic and scalable.
- It uses [Terraform](https://www.terraform.io/) to provision the required cloud infrastructure so it's really easy to deploy the whole project and destroy it whenever it's not needed any more. (Infrastructure as code)
- It's built on top of wagtail. Wagtail enables django developers to have a professional headless CMS which can be customized for many types of businesses.




## What's included
This repository contains the project's frontend microservice. It's a modern react application created by nextjs framework. It has these nice features:

#### 1. SEO friendly
Unlike `create-react-app`, nextjs renders html files at server side. So search engine crawlers can easily read the website.

#### 2. Supporting multiple Data-fetching methods
Nextjs provides powerful tools for data-fetching. Frontend developers can combine different ways of data-fetching to construct the most optimized application.

For example, here is our Post page:


    const Page = ({ post }) => {
      const postJson = JSON.parse(post);
      return (
        <Layout>
          <Post post={postJson} />
        </Layout>
      );
    };

    export const getStaticProps = async ({ params, preview, previewData }) => {
      const post = await getPostBySlug(params.slug);
        if (post) {
          return {
            props: {
              post: JSON.stringify(post),
            },
            revalidate: 5,
          };
        } else {
            return {
              notFound: true,
            };
        }
    };

    export const getStaticPaths = async () => {
      const slugs = await getPostSlugs();
      return {
        paths: slugs.map((slug) => `/posts/${encodeURIComponent(slug)}`),
        fallback: "blocking",
      };
    };
    
These two serverless functions (`getStaticProps` and `getStaticPaths`) are used to generate all posts at build stage (`npm run build`). This means when a user's bowser requests a page, it's already there! But unlike static site generators, the created html files can get updated after that. 

Nextjs also provides `getServerSideProps` and `useSWR` hook for other scenarios. To read more about nextjs data-fetching check [this](https://nextjs.org/docs/basic-features/data-fetching) out.

#### 3. Nextjs image optimization
For more details check [this](https://nextjs.org/docs/basic-features/image-optimization) out.

#### 4. Material UI
This project is built using [Material UI](https://material-ui.com/).

## Run this project

#### 1. Clone this repository:
    git clone https://github.com/HsnVahedi/engineerx-frontend
#### 2. Pull the required backend docker images:
    cd engineerx-frontend
    docker-compose -f backend-docker-compose.yaml pull
#### 3. Start the backend production server:
    docker-compose -f backend-docker-compose.yaml up
#### 4. Now open another terminal and execute bash in the backend container:
    docker-compose -f backend-docker-compose.yaml exec backend bash
#### 5. Initialize the database with randomly generated objects:
    python manage.py initdb
#### 6. Now open another terminal and Install npm packages:
    npm install
#### 7. Run frontend microservice:
If you want to run development environment, simply run `npm run dev`. If you want to run production environment run `export LOCAL=1 && npm run build && npm run start`.
    
Now you can see the project is running on `127.0.0.1:3000/`.



## EngineerX code repositories

EngineerX is a big project and consists of several code bases:

- [engineerx-aws-cli](https://github.com/HsnVahedi/engineerx-aws-cli)
- [engineerx-aws-infrastructure](https://github.com/HsnVahedi/engineerx-aws-infrastructure)
- [engineerx-aws-deployment](https://github.com/HsnVahedi/engineerx-aws-deployment)
- [engineerx-backend](https://github.com/HsnVahedi/engineerx-backend)
- [engineerx-frontend](https://github.com/HsnVahedi/engineerx-frontend)
- [engineerx-integration](https://github.com/HsnVahedi/engineerx-integration)
- [engineerx-backend-unittest](https://github.com/HsnVahedi/engineerx-backend-unittest)
- [engineerx-frontend-unittest](https://github.com/HsnVahedi/engineerx-frontend-unittest)
- [engineerx-integration-test](https://github.com/HsnVahedi/engineerx-integration-test)
- [engineerx-efs-pv](https://github.com/HsnVahedi/engineerx-efs-pv)
- [engineerx-efs-pvc](https://github.com/HsnVahedi/engineerx-efs-pvc)
- [engineerx-backend-latest-tag](https://github.com/HsnVahedi/engineerx-backend-latest-tag)
- [engineerx-frontend-latest-tag](https://github.com/HsnVahedi/engineerx-frontend-latest-tag)

# Response Patterns 📦

> Very simple Response Patterns for NodeJS

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/responses?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/responses?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a viable and simple Response Pattern to use in any type of `NodeJS Framework`

<img src=".github/responses.jpg" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

You can install the Response using;

```bash
yarn add @SecJS/Responses
```

## Usage

> You can call the SecResponse class to create a new response

```js
import SecResponse from '@SecJS/Responses'

import TestsService from '@Services/TestsService'
import TestsRepository from '@Repositories/TestsRepository'

export default class TestsController {
  public async index({ request, response }) {
    const params = request.params()

    const tests = await new IndexRepository().findAllBy(params)

    new SecResponse(response).withCollection(tests, 'All Tests')
  }

  public async store({ request, response }) {
    const body = request.body

    const test = await new TestsService().create(body)

    new SecResponse(response).withCreated(test, 'Test Stored')
  }

  public async show({ request, response }) {
    const params = request.params()

    const test = await new TestsRepository().findOne(params)

    new SecResponse(response).withOne(test, 'One Test')
  }

  public async update({ request, response }) {
    const body = request.body
    const params = request.params()

    const test = await new TestsService().edit(params, body)

    new SecResponse(response).withUpdated(test, 'Test Updated')
  }

  public async destroy({ request, response }) {
    const params = request.params()

    const test = await new TestsService().delete(params)

    new SecResponse(response).withDeleted(`Test of name ${test.name} has been deleted`)
  }
}

```

> You can find all definitions and methods calling the ```ISecResponse Interface```.

```js
import { ISecResponse } from '@SecJS/Responses'

// It will have this format
interface ISecResponse {
  withCollection<TData = any>(dataObj: Array<TData>, message?: string): void
  withOne(dataObj: object, message?: string): void
  withCreated(dataObj: object, message?: string): void
  withUpdated(dataObj: object, message?: string): void
  withDeleted(message?: string): void
  withoutBody(message?: string): void
  withError(
    dataObj?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
    exception?: any,
  ): void
  withValidationError(
    dataObj?: any,
    validation?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
  ): void
}
```

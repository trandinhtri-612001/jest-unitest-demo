'use strict';
const axios = require('axios');
const Service = require('../src/service');

jest.mock('axios');

describe('should test Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('when #list method succeeds', async () => {
    const responseData = {
      data: {
        field: 'field',
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(responseData));

    const response = await Service.list();
    expect(response).toEqual(responseData.data);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('when #update method succeeds', async () => {
    const postId = 1;
    const dataUp = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    const response = await Service.update(postId, dataUp);
    expect(response).toMatch(true);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('when #update method fails', async () => {
    const errorMessage = 'Network Error';
    try {
      const errorData = new Error(errorMessage);
      axios.get.mockImplementationOnce(() => Promise.reject(errorData));
      const postId = 1;
      const dataUp = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      };
      const response = await Service.update(postId, dataUp);
      expect(response).toMatch(false);
      throw new Error('default error to invalidate a false positive test case');
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
      expect(axios.get).rejects;
      expect(axios.get).toHaveBeenCalledTimes(1);
    }
  });

  test('when #delete method succeeds', async () => {
    const postId = 1;
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    const response = await Service.delete(postId);
    expect(response).toMatch(true);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('when #delete method fails', async () => {
    const errorMessage = 'Network Error';
    try {
      const errorData = new Error(errorMessage);
      axios.get.mockImplementationOnce(() => Promise.reject(errorData));
      const postId = 1;
      const response = await Service.delete(postId);
      expect(response).toMatch(false);
      throw new Error('default error to invalidate a false positive test case');
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
      expect(axios.get).rejects;
      expect(axios.get).toHaveBeenCalledTimes(1);
    }
  });

  test('kiem tra async truong thanh thanh cong', async () => {
    const data = await checkIsAdult(20);
    expect(data).toBe('Da tren 18');
  });

  test('kiem tra async truong thanh that bai', async () => {
    expect.assertions(1);
    try {
      await checkIsAdult(13);
    } catch (e) {
      expect(e.message).toMatch('Chua an duoc');
    }
  });

  test('when #list method fails', async () => {
    const errorMessage = 'Network Error';
    try {
      const errorData = new Error(errorMessage);
      axios.get.mockImplementationOnce(() => Promise.reject(errorData));
      await Service.list();
      throw new Error('default error to invalidate a false positive test case');
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
      expect(axios.get).rejects;
      expect(axios.get).toHaveBeenCalledTimes(1);
    }
  });
});

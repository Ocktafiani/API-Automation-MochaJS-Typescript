import { expect } from "chai";
import axios, { AxiosError } from 'axios';


describe("API Automation Testing Reqres", () => {
    const baseURL = 'https://reqres.in/api';

    describe('API Testing with Mocha, Chai, and TypeScript', () => {
    
      it('Should get a single user', async () => {
        const response = await axios.get(`${baseURL}/users/2`);
    
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.have.property('id', 2);
        expect(response.data.data).to.have.property('first_name', 'Janet');
      });
    
      it('Should pass register a new user', async () => {
        const userPayload = {
          'email': 'eve.holt@reqres.in',
          'password': 'pistol'
        };
    
        const response = await axios.post(`${baseURL}/register`, userPayload);
    
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id')
        expect(response.data).to.have.property('token')
      });

      it('Should fail register a new user', async () => {
        const userPayload = {
          'email': 'sydney@fife',
        };

        try {
          await axios.post(`${baseURL}/register`, userPayload);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            expect(error.response?.status).to.equal(400);
            expect(error.response?.data).to.have.property('error', 'Missing password');
          } else {
            throw error;
          }
        } 
      });

      it('Should pass login', async () => {
        const loginPayload = {
          'email' : 'eve.holt@reqres.in',
          'password' : 'cityslicka'
        };

        const response = await axios.post(`${baseURL}/login`, loginPayload)

        expect(response.status).to.equal(200)
        expect(response.data).to.have.property('token')

      });

      it('Should fail login', async () => {
        const loginPayload = {
          'email' : 'eve.holt@reqres.in',
        };

        try{
          await axios.post(`${baseURL}/login`, loginPayload)
        } catch (error){
          if(axios.isAxiosError(error)){
            expect(error.response?.status).to.equal(400);
            expect(error.response?.data).to.have.property('error','Missing password')
          } else {
            throw error;
          }
        }
    });
    
      it('Should pass update an existing user', async () => {
        const userPayload = {
          name: 'Ockta',
          job: 'QA'
        };
    
        const response = await axios.patch(`${baseURL}/users/2`, userPayload);
    
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name', 'Ockta');
        expect(response.data).to.have.property('job', 'QA');
      });

    });
});
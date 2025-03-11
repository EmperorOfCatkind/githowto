import { expect } from 'chai';
import * as path from 'path';
import { PactV3, MatchersV3, Verifier } from '@pact-foundation/pact';
import { UserStoreService } from 'src/services/user-store.service';
import { UserDto } from '../src/models/user.dto';
const { like } = MatchersV3;

describe('PactV3 UserStore consumer tests', () => {
    let userStoreService: UserStoreService;

    const provider = new PactV3({
        consumer: 'User-Web-v3',
        provider: 'User-API-v3'
    });

    const userListExample: UserDto[] = [
        new UserDto(101, 'john_doe', 'John', 'Doe', 'john@example.com', 'password123', '1234567890', 1),
        new UserDto(102, 'jane_doe', 'Jane', 'Doe', 'jane@example.com', 'password456', '0987654321', 1)
    ];

    const EXPECTED_BODY = like({
        code: 200,
        message: 'ok',
        type: 'unknown'
    });

    describe('create users with list', () => {
        it('should create multiple users successfully', () => {
            provider
                .given('users creation interaction')
                .uponReceiving('create users with list')
                .withRequest({
                    method: 'POST',
                    path: '/v2/user/createWithList',
                    body: userListExample,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: { 'content-type': 'application/json' },
                    body: EXPECTED_BODY
                });

            return provider.executeTest(async (mockserver) => {
                userStoreService = new UserStoreService(mockserver.url);
                const response = await userStoreService.createUsersWithList(userListExample);

                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('code', 200);
                expect(response.data).to.have.property('message', 'ok');
                expect(response.data).to.have.property('type', 'unknown');
            });
        });
    });
});

describe('PactV3 UserStore Provider Verification', () => {
    it('validates the expectations of User API', () => {
        return new Verifier({
            providerBaseUrl: 'https://petstore.swagger.io',
            pactUrls: [path.resolve(process.cwd(), './pacts/User-Web-v3-User-API-v3.json')]
        }).verifyProvider();
    });
});

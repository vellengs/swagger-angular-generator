import {generate} from '../../src/generate';

class TestInitClass {
  createTestContent() {
    generate('swagger-files/unit-test-swagger.json', 'generated', true, true, '/swagger', 'test', true);
  }
}

const testInitClass = new TestInitClass();
testInitClass.createTestContent();

const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }
  async getAll() {
    // open the file called this.filename, reads the file, parses the JSON
    return JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    }));
  }

  async create(attributes) {
    attributes.id = this.randomId();
    const records = await this.getAll();
    records.push(attributes);

    await this.writeAll(records);

  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  randomId() {
    return crypto.randomBytes(8).toString('hex');
  }

  async getOne(id) {
    const record = await this.getAll();
    return record.find(record => record.id === id);
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');
  const user = await repo.getOne('eee920e7d4f4');
  console.log(user);
};

test();
import serverless from 'serverless-http';
import express from 'express';
import mexicanRepository from 'repositories/mexican';
import uuidv4 from 'uuid/v4';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
  res.json({ message: 'Hello mexpress!' });
});

app.get('/mexicans/:mexicanId', async function(req, res) {
  try {
    const { mexicanId } = req.params;
    const mexican = await mexicanRepository.get(mexicanId);
    res.json(mexican);
  } catch (err) {
    if (err.message === 'Mexican not found') {
      res.json({ message: err.message });
    } else {
      res.send(err);
    }
  }
});

app.delete('/mexicans/:mexicanId', async function(req, res) {
  try {
    const { mexicanId } = req.params;
    await mexicanRepository.delete(mexicanId);
    res.send('delete succeeded');
  } catch (err) {
    if (err.message === 'Mexican not found') {
      res.json({ message: err.message });
    } else {
      res.send(err);
    }
  }
});

app.put('/mexican', async function(req, res) {
  try {
    const newMexican = {
      id: uuidv4(),
      name: req.body.name,
      bio: req.body.bio,
    };
    await mexicanRepository.create(newMexican);
    res.json(newMexican);
  } catch (err) {
    res.send(err);
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);

module.exports.main = serverless(app);

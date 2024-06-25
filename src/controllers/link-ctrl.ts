import type { Direction } from '../global.js';
import { getId } from '../libs/index.js';
import { Link } from '../models/index.js';

export const postLink: Direction = async (req, res) => {
  const link = await Link.create({
    id: await getId(),
    authorId: req.user.id,
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  }).save();

  return res.json({ success: true, link });
};

export const postEdit: Direction = async (req, res) => {
  const { title, url, description } = req.body;
  const updateOptions = { title, url, description };

  await Link.update({ id: req.params.id }, updateOptions);

  return res.json({ success: true, edit: updateOptions });
};

export const deleteLink: Direction = async (req, res) => {
	await Link.delete({ id: req.params.id, authorId: req.user.id });

	return res.json({ success: true, delete: true });
};

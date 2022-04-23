import { ItemTypeShort } from './types';
import fs from 'fs';
import env from 'process';
import { parse } from 'yaml';

const hostsPath = `${env.env.ANSIBLE_SERVER_PATH}/ansible-server-config/hosts`;

export function getItems(): ItemTypeShort[] {
  if (!env.env.ANSIBLE_SERVER_PATH) {
    console.error('ANSIBLE_SERVER_PATH undefined: ', env.env.ANSIBLE_SERVER_PATH);
    return [];
  }

  return _getItems();
}

function _getItems(): ItemTypeShort[] {
  const hostnames = fs
    .readdirSync(hostsPath)
    .filter((el) => el !== 'README.md' && el !== '_example');
  const hosts = hostnames.map((hostname) => getHost(hostname));

  const items = [];
  for (const host of hosts) {
    items.push(...host);
  }
  return items;
}

function getHost(hostname: string): ItemTypeShort[] {
  const items = [];
  items.push({
    type: 'host',
    name: hostname,
    host: hostname,
    // data: {},
  });
  items.push(...getHostItems(hostname, 'site'));
  items.push(...getHostItems(hostname, 'project'));
  return items;
}

function getHostItems(host: string, type: 'project' | 'site'): ItemTypeShort[] {
  const dir = `${hostsPath}/${host}/${type}s`;
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  const items =
    fs
      .readdirSync(dir)
      .filter((el) => el.includes('.yml'))
      .map((itemName) => {
        const raw = fs.readFileSync(`${dir}/${itemName}`);
        const name = itemName.replace('.yml', '');
        const data = {}; //parse(`${raw}`);
        return { type, name, host/* , data */ } as ItemTypeShort;
      }) || [];

  return items;
}

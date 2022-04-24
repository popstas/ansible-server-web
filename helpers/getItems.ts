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
  const children = [
    ...getHostItems(hostname, 'site'),
    ...getHostItems(hostname, 'project'),
  ];
  items.push(...children);

  items.push({
    type: 'host',
    name: hostname,
    host: hostname,
    readme: getReadme(hostname),
    data: getYaml(`${hostsPath}/${hostname}/vars.yml`),
    children,
  });

  return items;
}

function getHostItems(host: string, type: 'project' | 'site'): ItemTypeShort[] {
  const dir = `${hostsPath}/${host}/${type}s`;
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs
    .readdirSync(dir)
    .filter((el) => el.includes('.yml'))
    .map((itemName) => {
      const data = getYaml(`${dir}/${itemName}`);
      const readme = data?.readme || data?.p_init_readme || "";
      const name = itemName.replace('.yml', '');
      return { type, name, host, data, readme } as ItemTypeShort;
    }) || [];
}

function getYaml(path: string) {
  if (!fs.existsSync(path)) return {};
  const raw = fs.readFileSync(path);
  return parse(`${raw}`);
}

function getReadme(slug: string): string {
  const readmePath = `${hostsPath}/${slug}/README.md`;
  if (fs.existsSync(readmePath)) {
    return fs.readFileSync(readmePath).toString();
  }
  return '';
}
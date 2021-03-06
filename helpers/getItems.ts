import { ItemTypeShort } from 'helpers/types';
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

  const playbook = getYaml(`${hostsPath}/${hostname}/playbook.yml`);

  items.push({
    type: 'host',
    slug: hostname,
    name: hostname,
    host: hostname,
    readme: getReadme(hostname),
    data: getYaml(`${hostsPath}/${hostname}/vars.yml`),
    roles: playbook && playbook[0]?.roles ? playbook[0].roles : [],
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
    .map((filename) => {
      const data = getYaml(`${dir}/${filename}`);
      const readme = data?.readme || data?.p_init_readme || "";
      const name = filename.replace('.yml', '');
      const slug = `${host}/${type}s/${name}`;
      return { slug, type, name, host, data, readme } as ItemTypeShort;
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
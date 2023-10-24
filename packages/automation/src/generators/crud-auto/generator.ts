import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { CrudAutoGeneratorSchema } from './schema';
function visitAllFiles(tree: Tree, path: string, callback: (filePath: string) => void) {
  tree.children(path).forEach((fileName) => {
    const filePath = `${path}/${fileName}`;
    if (!tree.isFile(filePath)) {
      visitAllFiles(tree, filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

export async function crudAutoGenerator(tree: Tree, options: CrudAutoGeneratorSchema) {
  const nameList = options.name.split('/');

  const name = nameList[nameList.length - 1];
  const nameDB = name.replace(/-/g, '_');

  const nameUpCap = nameList[nameList.length - 1]
    .split('-')
    .map((name) => name.replace(name.charAt(0), name.charAt(0).toUpperCase()))
    .join('');
  const nameUpCapNotOne = nameList[nameList.length - 1]
    .split('-')
    .map((name, index) =>
      index === 0 ? name : name.replace(name.charAt(0), name.charAt(0).toUpperCase()),
    )
    .join('');

  const projectRoot = `${options.name}`;
  const resolvedOption = {
    ...options,
    name: name,
    nameUpCap: nameUpCap,
    nameDB: nameDB,
    nameUpCapNotOne: nameUpCapNotOne,
  };

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOption);

  visitAllFiles(tree, projectRoot, (pathName) => {
    const newPath = pathName.replace('__APP__', name);

    tree.rename(pathName, newPath);
  });
  await formatFiles(tree);
}

export default crudAutoGenerator;

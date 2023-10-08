import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { AppFolderGeneratorSchema } from './schema';

function visitAllFiles(
  tree: Tree,
  path: string,
  callback: (filePath: string) => void
) {
  tree.children(path).forEach((fileName) => {
    const filePath = `${path}/${fileName}`;
    if (!tree.isFile(filePath)) {
      visitAllFiles(tree, filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

export async function appFolderGenerator(
  tree: Tree,
  options: AppFolderGeneratorSchema
) {
  const nameList = options.name.split('/');

  const name = nameList[nameList.length - 1];
  const nameUpCap = nameList[nameList.length - 1]
    .split('-')
    .map((name) => name.replace(name.charAt(0), name.charAt(0).toUpperCase()))
    .join('');
  console.log('🚀 ~ file: generator.ts:33 ~ nameUpCap:', nameUpCap);

  const projectRoot = `${options.name}`;
  const resolvedOption = {
    ...options,
    name: name,
    nameUpCap: nameUpCap,
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    resolvedOption
  );

  visitAllFiles(tree, projectRoot, (pathName) => {
    const newPath = pathName.replace('__APP__', name);

    tree.rename(pathName, newPath);
  });
  await formatFiles(tree);
}

export default appFolderGenerator;

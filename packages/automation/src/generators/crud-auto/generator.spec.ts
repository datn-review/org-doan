import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { crudAutoGenerator } from './generator';
import { CrudAutoGeneratorSchema } from './schema';

describe('crud-auto generator', () => {
  let tree: Tree;
  const options: CrudAutoGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await crudAutoGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

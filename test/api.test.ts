import mongoose from 'mongoose';
import app from '../src/app';
import randomstring from 'randomstring';
import { Express } from 'express';
import { Polygon } from 'geojson';

import {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from './testCategories';
import {
  postSpecies,
  putSpecies,
  getSpecies,
  getSpeciesById,
  getSpeciesByArea,
  deleteSpecies,
} from './testSpecies';
import {
  postAnimal,
  putAnimal,
  getAnimals,
  getAnimalById,
  getAnimalsByArea,
  getaAnimalsBySpecies,
  deleteAnimal,
} from './testAnimals';
import { TestCategory, TestSpecies, TestAnimal } from './testTypes';
import { MessageResponse } from '../src/types/Messages';

describe('API v1 tests', () => {
  beforeAll(async () => {
    if (!process.env.DB_URL_TEST) {
      throw new Error('DB_URL_TEST is not defined');
    }
    await mongoose.connect(process.env.DB_URL_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Category tests
  let categoryResponse: MessageResponse & { data: TestCategory };

  it('Should post a category', async () => {
    categoryResponse = await postCategory(app, 'category' + randomstring.generate(5));
  });

  it('Should get array of categories', async () => {
    await getCategories(app);
  });

  it('Should get a category by ID', async () => {
    await getCategory(app, categoryResponse.data._id);
  });

  it('Should put a category', async () => {
    await putCategory(app, categoryResponse.data._id, 'edit_category' + randomstring.generate(5));
  });

  // Species tests
  let speciesResponse: MessageResponse & { data: TestSpecies };

  it('Should post a species', async () => {
    speciesResponse = await postSpecies(app, 'Lion', categoryResponse.data._id, {
      type: 'Point',
      coordinates: [60.38, 24.6],
    });
  });

  it('Should get array of species', async () => {
    await getSpecies(app);
  });

  it('Should get a species by ID', async () => {
    await getSpeciesById(app, speciesResponse.data._id);
  });

  it('Should get all species by area', async () => {
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [60.3, 24.5],
          [60.5, 24.5],
          [60.5, 24.7],
          [60.3, 24.7],
          [60.3, 24.5],
        ],
      ],
    };
    await getSpeciesByArea(app, polygon);
  });

  it('Should put a species', async () => {
    const newSpeciesName = 'Leijona' + randomstring.generate(5);
    await putSpecies(app, speciesResponse.data._id, newSpeciesName, {
      type: 'Point',
      coordinates: [60.39, 24.7],
    });
  });

  // Animal tests
  let animalResponse: MessageResponse & { data: TestAnimal };

  it('Should post an animal', async () => {
    animalResponse = await postAnimal(app, 'Simba' + randomstring.generate(5), speciesResponse.data._id, new Date('2015-12-24'), {
      type: 'Point',
      coordinates: [60.4, 24.61],
    });
  });

  it('Should get array of animals', async () => {
    await getAnimals(app);
  });

  it('Should get an animal by ID', async () => {
    await getAnimalById(app, animalResponse.data._id);
  });

  it('Should get all animals by area', async () => {
    await getAnimalsByArea(app, '60.3,24.5', '60.5,24.7');
  });

  it('Should get all animals by species name', async () => {
    await getaAnimalsBySpecies(app, speciesResponse.data.species_name);
  });

  it('Should put an animal', async () => {
    await putAnimal(app, animalResponse.data._id, 'Simba' + randomstring.generate(5), new Date('2014-12-24'), {
      type: 'Point',
      coordinates: [60.4, 24.61],
    });
  });

  // Delete test data
  it('Should delete the animal', async () => {
    await deleteAnimal(app, animalResponse.data._id);
  });

  it('Should delete the species', async () => {
    await deleteSpecies(app, speciesResponse.data._id);
  });

  it('Should delete the category', async () => {
    await deleteCategory(app, categoryResponse.data._id);
  });
});

















/*import {Polygon} from 'geojson';
import mongoose from 'mongoose';
import app from '../src/app';
import {testInvalidRoute, testServer} from './testServer';
import {MessageResponse} from '../src/types/Messages';
import randomstring from 'randomstring';
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCategory,
  putCategory,
} from './testCategories';
import {
  deleteSpecies,
  getSpecies,
  getSpeciesByArea,
  getSpeciesById,
  postSpecies,
  putSpecies,
} from './testSpecies';
import {
  deleteAnimal,
  getaAnimalsBySpecies,
  getAnimalById,
  getAnimals,
  getAnimalsByArea,
  postAnimal,
  putAnimal,
} from './testAnimals';
import {TestAnimal, TestCategory, TestSpecies} from './testTypes';


describe('GET /api/v1', () => {
  beforeAll(async () => {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not defined');
    }
    await mongoose.connect(process.env.DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test that server is running
  it('server root should return 200', async () => {
    await testServer(app);
  });

  // test that invalid routes return 404
  it('invalid route should return 404', async () => {
    await testInvalidRoute(app, '/api/v1/invalid');
  });

  // test succesful category routes
  type DBMessageResponseCategory = MessageResponse & {
    data: TestCategory | TestCategory[];
  };

  let categoryResponse: DBMessageResponseCategory;

  it('Should post a category', async () => {
    categoryResponse = await postCategory(
      app,
      'category' + randomstring.generate(5),
    );
  });

  it('Should get array of categories', async () => {
    await getCategories(app);
  });

  it('Should get a category', async () => {
    if (Array.isArray(categoryResponse.data)) {
      return;
    }
    await getCategory(app, categoryResponse.data._id);
  });

  it('Should put a category', async () => {
    if (Array.isArray(categoryResponse.data)) {
      return;
    }
    await putCategory(
      app,
      categoryResponse.data._id!,
      'edit_category' + randomstring.generate(5),
    );
  });

  // test successful species routes
  type DBMessageResponseSpecies = MessageResponse & {
    data: TestSpecies | TestSpecies[];
  };
  let speciesResponse: DBMessageResponseSpecies;

  it('Should post a species', async () => {
    if (Array.isArray(categoryResponse.data)) {
      return;
    }
    speciesResponse = await postSpecies(
      app,
      'Lion',
      categoryResponse.data._id,
      {
        type: 'Point',
        coordinates: [60.38, 24.6],
      },
    );
    console.log(speciesResponse);
  });

  it('Should get array of species', async () => {
    await getSpecies(app);
  });

  it('Should get a species', async () => {
    if (Array.isArray(speciesResponse.data)) {
      return;
    }
    await getSpeciesById(app, speciesResponse.data._id);
  });

  it('Should get all species by area', async () => {
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [60.3, 24.5],
          [60.5, 24.5],
          [60.5, 24.7],
          [60.3, 24.7],
          [60.3, 24.5],
        ],
      ],
    };
    await getSpeciesByArea(app, polygon);
  });

  const newSpeciesName = 'Leijona' + randomstring.generate(5);

  it('Should put a species', async () => {
    if (Array.isArray(speciesResponse.data)) {
      return;
    }
    await putSpecies(app, speciesResponse.data._id, newSpeciesName, {
      type: 'Point',
      coordinates: [60.39, 24.7],
    });
  });

  // test successful animal routes

  type DBMessageResponseAnimals = MessageResponse & {
    data: TestAnimal | TestAnimal[];
  };
  let animalResponse: DBMessageResponseAnimals;

  it('Should post an animal', async () => {
    if (Array.isArray(speciesResponse.data)) {
      return;
    }
    animalResponse = await postAnimal(
      app,
      'Simba' + randomstring.generate(5),
      speciesResponse.data._id,
      new Date('2015-12-24'),
      {
        type: 'Point',
        coordinates: [60.4, 24.61],
      },
    );
  });

  it('Should get array of animals', async () => {
    await getAnimals(app);
  });

  it('Should get an animal', async () => {
    if (Array.isArray(animalResponse.data)) {
      return;
    }
    await getAnimalById(app, animalResponse.data._id);
  });

  it('Should put an animal', async () => {
    if (Array.isArray(animalResponse.data)) {
      return;
    }
    animalResponse = await putAnimal(
      app,
      animalResponse.data._id,
      'Simba' + randomstring.generate(5),
      new Date('2014-12-24'),
      {
        type: 'Point',
        coordinates: [60.4, 24.61],
      },
    );
  });

  it('Should get all animals by area', async () => {
    await getAnimalsByArea(app, '60.3,24.5', '60.5,24.7');
  });

  it('Should get all animals by species name', async () => {
    await getaAnimalsBySpecies(app, newSpeciesName);
  });

  // delete test data

  it('Should delete a category', async () => {
    if (Array.isArray(categoryResponse.data)) {
      return;
    }
    await deleteCategory(app, categoryResponse.data._id);
  });

  it('Should delete a species', async () => {
    if (Array.isArray(speciesResponse.data)) {
      return;
    }
    await deleteSpecies(app, speciesResponse.data._id);
  });

  it('Should delete an animal', async () => {
    if (Array.isArray(animalResponse.data)) {
      return;
    }
    await deleteAnimal(app, animalResponse.data._id);
  });
});
*/

import fs from 'fs';
import path from 'path';

const elementsDirectory = path.join(process.cwd(), 'public', 'images', 'elements');

export function getElementsList () {
  const elementNames = fs.readdirSync(elementsDirectory);
  const elementsList = elementNames.map(elementName => {
    const imagesDirectory = path.join(elementsDirectory, elementName);
    const imageNames = fs.readdirSync(imagesDirectory);
    const imagesList = imageNames.map(imageName => {
      const id = imageName.replace(/\.png$/, '');
      return id;
    });

    const featuredImageIndex = Math.floor(Math.random() * imagesList.length);
    const featuredImageID = imagesList[featuredImageIndex];
    return {
      elementName,
      imagesList,
      featuredImageID
    };
  })

  // sort elements randomly
  return elementsList.sort((a, b) => {
    if (a.elementName === 'light')
      return -1;

    if (a.elementName === 'shadow' && b.elementName === 'arcane')
      return -1;
  });
};

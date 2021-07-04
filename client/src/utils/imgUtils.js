const unsplashLandscapeCollectionID = 827743;

const getBackgroundImg = (width, height) => {
    const unsplashAPI = `https://source.unsplash.com/collection/${unsplashLandscapeCollectionID}/${width}x${height}`; 

    return unsplashAPI
}

export const imgUtils = {
    getBackgroundImg: getBackgroundImg
}
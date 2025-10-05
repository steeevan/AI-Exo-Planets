
function ExoplanetPage() {
    return (
        <div>
        <h1>What are exoplanets?</h1>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        </div>
        <h2 className="text-center">Exoplanets are planets that orbit stars outside our solar system.</h2>
        <p className="text-left"> Planets are rocky icy or gaseous bodies that do not radiate light, and orbit a star. 
            They also clear their orbital path, and need to have enough gravity to be in a spherical shape, 
            from hydrostatic equilibrium. We often find exoplanets by the periodic dimming of stars. 
            This works because when the planet passes in front of the star it blocks the light, so you are able to calculate orbital period from that aswell.
            Another way is radial velocity. We are checking to see if the star's movement seems to be affected by an exoplanet.
            It gives it red shift or blue shift depending on the direction of the star's movement relative to us, from the Doppler effect.
        </p>
        </div>
    )
};

export default ExoplanetPage;
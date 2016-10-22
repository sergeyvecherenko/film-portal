import sessions       from './sessions';
import films          from './films';
import socialNetworks from './SocialNetworks';
import languages      from './languages';
import actors         from './actors';
import categories     from './categories';

export default function routesInit() {
    return {
        sessions,
        films,
        socialNetworks,
        languages,
        actors,
        categories
    };
}

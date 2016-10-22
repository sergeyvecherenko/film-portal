export function dumpUser(user) {
    return {
        id         : user.id,
        name       : user.name,
        email      : user.email,
        phone      : user.phone,
        status     : user.status,
        role       : user.role,
        saqType    : user.saqType,
        auditor    : user.auditor,
        createdAt  : user.createdAt,
        updatedAt  : user.updatedAt
    };
}

export function dumpFilm(data) {
    return {
        id:          data.film_id,
        title:       data.title,
        description: data.description,
        releaseYear: data.release_year,
        length:      data.length,
        rating:      data.rating,
        language:    data.language && data.language.name || '',
        category:    data.category && data.category.name || '',
        actorNames:  data.actor.length ? data.actor.map(dumpActors) : []
    };
}

export function dumpActors(actor) {
    return {
        id: actor.actor_id,
        firstName: actor.first_name || '',
        secondName: actor.last_name || ''
    };
}

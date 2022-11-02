export function removeClass( items, className ){

    for( const item of items )
        item.classList.remove( className )

}

export function addClass( items, className ){

    for( const item of items )
        item.classList.add( className )

}
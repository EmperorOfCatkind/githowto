const book = {
    title: "A book to Read",
    author: "Writer McWriterich",
    metadata:
        {
            pages: 100,
            words: 1000,
            published: 2001
        },
    printMetadata: function(){
        const metadataArray = Object.values(book.metadata);
        console.log(metadataArray.join("; "));
    },
    printTitle: function(){
        console.log(this.title);
    },
    printPages: function(){
        console.log(this.metadata.pages);
    }
};

book.printMetadata();
book.printTitle();
book.printPages();

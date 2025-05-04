const shopList = [
    {
        title: 'Chairs',
        items: [
            {
                id: 1,
                name: "Amelia Leather Swivel Chair",
                category: "Chairs",
                status: "New",
                price:  3400,
                image: "https://cdn.arhaus.com/product/StandardV2/ZLILSW2_A241202.jpg?preset=Product1200x924",
                details: "Crafted by our North Carolina upholstery artisans working with some of the finest materials sourced around the world."
            },
            {
                id: 2,
                name: "Kipton Swivel Chair",
                category: "Chairs",
                status: "New",
                price: 3990,
                image: "https://cdn.arhaus.com/product/StandardV2/1003301SWNS_BB230621.jpg?preset=Product1200x924",
                details: "Crafted by our North Carolina upholstery artisans working with some of the finest materials sourced around the world."
            },
            {
                id: 3,
                name: "Walsh Glider",
                category: "Chairs",
                status: "Promo",
                price: 1800,
                image: "https://cdn.arhaus.com/product/StandardV2/10G137SWGLCF_D240621.jpg?preset=Product1200x924",
                details: `Craftsman-built frames are constructed using solid, reinforced laminate hardwood for lasting strength and durability.`
            },
            {
                id: 4,
                name: "Gallo Swivel Reclining Glider",
                category: "Chairs",
                status: "Promo",
                price: 5800,
                image: "https://cdn.arhaus.com/product/StandardV2/10ATASWLPO_D241004.jpg?preset=Product1200x924",
                details: `Crafted by our Texas upholstery artisans working with some of the finest materials sourced around the world.`
            },
            {
                id: 5,
                name: "Fresno Swivel Chair",
                category: "Chairs",
                status: "Promo",
                price: 1990,
                image: "https://cdn.arhaus.com/product/StandardV2/10857SWCHPP_DI241016.jpg?preset=Product1200x924",
                details: `Crafted by our North Carolina upholstery artisans working with some of the finest materials sourced around the world.
        Frames are craftsman-built using cross-directional hardwood laminate certified by the Sustainable Forestry Initiative.`
            }
        ]
    },
    {
        title: 'Tables',
        items: [
            {
                id: 6,
                name: "Polanco Round Dining Table",
                category: "Tables",
                status: "New In Stock",
                price: 6200,
                image: "https://cdn.arhaus.com/product/StandardV2/30POL60RDKT_BM230503.jpg?preset=Product1200x924",
                details: `Handcrafted from oyster-cut fragments of salvaged Mexican ash and sustainably harvested European ash burl.`
            },
            {
                id: 7,
                name: "Saint Germain Round Stone Dining Table with Dauphine Base",
                category: "Tables",
                status: "Promo",
                price: 3800,
                image: "https://cdn.arhaus.com/product/StandardV2/30ESP54DPCKT_A231129.jpg?preset=Product1200x924",
                details: `Stone tabletops are constructed from Carrara marble, cream marble, or espresso brown stone, featuring reinforced engineered hardwood joinery to the base for added strength and stability.`
            },
            {
                id: 8,
                name: "Leandro Square Coffee Table",
                category: "Tables",
                status: "New",
                price: 3800,
                image: "https://cdn.arhaus.com/product/StandardV2/35LNDF42SQCF_BE240115.jpg?preset=Product1200x924",
                details: `Craftsman-built by our artisan partners in Mexico from reclaimed and sustainably sourced solid oak and oak veneers.`
            },
            {
                id: 9,
                name: "Vesuvius Console Table",
                category: "Tables",
                status: "Promo",
                price: 3100,
                image: "https://cdn.arhaus.com/product/StandardV2/35VESVSCONKT_BF220914.jpg?preset=Product1200x924",
                details: `Handcrafted in Italy from natural marble with a hand-applied matte lacquer finish.`
            },
            {
                id: 10,
                name: "Ezio Martini Table",
                category: "Tables",
                status: "Promo",
                price: 580,
                image: "https://cdn.arhaus.com/product/StandardV2/35EZIO12ABKT_BA241118.jpg?preset=Product1200x924",
                details: `Artisan-crafted martini table bases are made from solid, hand-welded iron with a matte black powder coated finish.`
            }
        ]
    },
    {
        title: 'Decor',
        items: [
            {
                id: 11,
                name: "Faux White Orchids in White Painted Bowl",
                category: "Decor",
                status: "Promo",
                price: 1099,
                image: "https://cdn.arhaus.com/product/StandardV2/7910063D111_C191220.jpg?preset=Product1200x924",
                details: `Crafted by our North Carolina upholstery artisans working with some of the finest materials sourced around the world.
        Frames are craftsman-built using cross-directional hardwood laminate certified by the Sustainable Forestry Initiative.`
            },
            {
                id: 12,
                name: "Remnants II Framed Print",
                category: "Decor",
                status: "New",
                price: 2040,
                image: "https://cdn.arhaus.com/product/StandardV2/799875REMTS2_B230412.jpg?preset=Product1200x924",
                details: `Gallery-wrapped print on canvas with hand-applied acrylic gel details.
                            Wood frame features a matte grey finish.`
            },
            {
                id: 13,
                name: "Dien Lumbar Pillow Cover",
                category: "Decor",
                status: "Promo",
                price: 99,
                image: "https://cdn.arhaus.com/product/StandardV2/61DIENSDLCVR_C241119.jpg?preset=Product1200x924",
                details: `A charming textural layering piece, our Dien Lumbar Pillow Covers feature striped embroidery over geometric color blocks.`
            },
            {
                id: 14,
                name: "Zola Vase in Stagno",
                category: "Decor",
                status: "Promo",
                price: 449,
                image: "https://cdn.arhaus.com/product/StandardV2/6510253D112_DA241014.jpg?preset=Product1200x924",
                details: `Expertly crafted by artisan partners, our Zola Vase is a captivating décor piece for any space. Inspired by the rich, earthy colors found in nature, each ceramic vase features a reactive glaze that creates varying markings and patterns—making each one truly unique.`
            },
            {
                id: 15,
                name: "Standing Deer",
                category: "Decor",
                status: "New",
                price: 899,
                image: "https://cdn.arhaus.com/product/StandardV2/653247S1002_C230721.jpg?preset=Product1200x924",
                details: `Make a statement with our life-size Standing Deer, a majestic accent to your holiday décor indoors or outdoors.`
            }
        ]
    }
    
];

export default shopList
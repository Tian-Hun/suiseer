module suiseer::tarot_reading {
    use sui::event;
    use sui::random::{Random, new_generator};

    // Structs

    public struct Card has copy, drop {
        card_id: u64,
        card_position: u8,
    }

    // Events
    public struct CardsGenerated has copy, drop {
        cards: vector<Card>,
    }

    // random a tarot card id
    entry fun draw_cards(
        card_amount: u64,
        max_card_id: u64,
        random: &Random,
        ctx: &mut TxContext,
    ) {
        let mut generator = new_generator(random, ctx);
        let mut cards = vector::empty<Card>();
        let mut used_ids = vector::empty<u64>();

        // Randomly generate a tarot card id and card position
        while (cards.length() < card_amount) {
            let card_id = generator.generate_u64_in_range(0, max_card_id);

            if (!vector::contains(&used_ids, &card_id)) {
                vector::push_back(&mut used_ids, card_id);
                let card_position = generator.generate_u8_in_range(0, 1);

                let card = Card {
                    card_id,
                    card_position,
                };

                vector::push_back(&mut cards, card);
            }
        };

        // 触发事件
        event::emit(CardsGenerated { cards: *&cards })
    }
}

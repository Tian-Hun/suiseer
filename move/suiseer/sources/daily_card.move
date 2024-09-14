/// Module: suiseer
module suiseer::daily_card {
    use sui::clock::{Self, Clock};
    use sui::random::{Random, new_generator};
    use sui::table::{Self, Table};
    use sui::event;
    use std::string::{String, utf8};
    use sui::display;
    use sui::package;

    public struct DAILY_CARD has drop {}

    public struct TarotOracle has key {
        id: UID,
        last_draws: Table<address, u64>,
    }

    public struct DailyTarotCardNFT has key, store {
        id: UID,
        name: String,
        description: String,
        blob_id: String,
        draw_time: u64,
    }

    public struct CardDrawnEvent has copy, drop {
        drawer: address,
        card_id: u64,
    }

    public struct MintedNFTEvent has copy, drop {
        minter: address,
        nft_id: ID,
    }

    const TOTAL_CARDS: u64 = 78;

    const EDailyCardAlreadyDrawn: u64 = 0;

    fun init(witness: DAILY_CARD, ctx: &mut TxContext) {
        // DailyTarotCardNFT display
        let keys = vector[
            utf8(b"name"),
            utf8(b"link"),
            utf8(b"image_url"),
            utf8(b"description"),
            utf8(b"project_url"),
            utf8(b"creator"),
        ];

        let values = vector[
            utf8(b"{name}"),
            utf8(b"https://suiseer.walrus.site/nft-gallery/{nft_id}"),
            utf8(b"https://cdn.suiftly.io/blob/{blob_id}"),
            utf8(b"{description}"),
            utf8(b"https://suiseer.walrus.site"),
            utf8(b"SuiSeer"),
        ];

        // Claim the `Publisher` for the package!
        let publisher = package::claim(witness, ctx);
        // Get a new `Display` object for the `Hero` type.
        let mut display = display::new_with_fields<DailyTarotCardNFT>(
            &publisher, keys, values, ctx
        );
        // Commit first version of `Display` to apply changes.
        display::update_version(&mut display);

        transfer::public_transfer(publisher, ctx.sender());
        transfer::public_transfer(display, ctx.sender());

        let oracle = TarotOracle {
            id: object::new(ctx),
            last_draws: table::new(ctx),
        };
        transfer::share_object(oracle);
    }

    entry fun draw_daily_card(
        oracle: &mut TarotOracle,
        clock: &Clock,
        random: &Random,
        ctx: &mut TxContext,
    ): u64 {
        let sender = ctx.sender();
        let current_time = clock::timestamp_ms(clock);

        if (table::contains(&oracle.last_draws, sender)) {
            let last_draw_time = *table::borrow(&oracle.last_draws, sender);
            let current_date = current_time / 86400000; // Convert current time to days since epoch
            let last_draw_date = last_draw_time / 86400000; // Convert last draw time to days since epoch
            assert!(current_date > last_draw_date, EDailyCardAlreadyDrawn);
            // Update the last draw time
            let last_draw_time_ref = table::borrow_mut(&mut oracle.last_draws, sender);
            *last_draw_time_ref = current_time;
        } else {
            table::add(&mut oracle.last_draws, sender, current_time);
        };

        let mut generator = new_generator(random, ctx);
        let card_id = generator.generate_u64_in_range(0, TOTAL_CARDS - 1); // Card IDs from 0 to 77

        // Emit an event for the drawn card
        event::emit(CardDrawnEvent {
            drawer: sender,
            card_id,
        });

        card_id
    }

    public entry fun mint_tarot_nft(
        name: String,
        description: String,
        blob_id: String,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let sender = ctx.sender();
        let current_time = clock::timestamp_ms(clock);

        let nft = DailyTarotCardNFT {
            id: object::new(ctx),
            blob_id,
            name,
            description,
            draw_time: current_time,
        };

        // Emit an event for the minted NFT
        event::emit(MintedNFTEvent {
            minter: sender,
            nft_id: object::uid_to_inner(&nft.id),
        });

        transfer::transfer(nft, sender);
    }
}

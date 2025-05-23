/datum/quirk/bilingual
	name = "Bilingual"
	desc = "Over the years you've picked up an extra language!"
	icon = FA_ICON_GLOBE
	value = QUIRK_COST_BILINGUAL // monkestation edit 4 -> QUIRK_COST_BILINGUAL
	gain_text = span_notice("Some of the words of the people around you certainly aren't common. Good thing you studied for this.")
	lose_text = span_notice("You seem to have forgotten your second language.")
	medical_record_text = "Patient speaks multiple languages."
	mail_goodies = list(/obj/item/taperecorder, /obj/item/clothing/head/frenchberet, /obj/item/clothing/mask/fakemoustache/italian)

/datum/quirk/bilingual/add_unique(client/client_source)
	var/wanted_language = client_source?.prefs?.read_preference(/datum/preference/choiced/language)
	if(isnull(wanted_language))
		return
	var/datum/language/language_type
	if(wanted_language == "Random")
		language_type = pick(GLOB.roundstart_languages)
	else
		language_type = GLOB.language_types_by_name[wanted_language]
	if(quirk_holder.has_language(language_type))
		language_type = /datum/language/uncommon
		if(quirk_holder.has_language(language_type))
			to_chat(quirk_holder, span_boldnotice("You are already familiar with the quirk in your preferences, so you did not learn one."))
			return
		to_chat(quirk_holder, span_boldnotice("You are already familiar with the quirk in your preferences, so you learned Galactic Uncommon instead."))
	quirk_holder.grant_language(language_type, source = LANGUAGE_QUIRK)

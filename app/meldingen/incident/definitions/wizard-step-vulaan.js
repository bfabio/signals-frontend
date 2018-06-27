// MVP
// Overlast op het water - geluid
// Overlast op het water - snel varen
// Overlast op het water - Gezonken boot

// import { Validators } from 'react-reactive-form';

import IncidentNavigation from '../components/IncidentNavigation';

import FormComponents from '../components/IncidentForm/components/';

export default {
  label: 'Dit hebben we nog van u nodig',
  form: {
    controls: {
      custom_text: {
        meta: {
          label: 'Dit hebt u net ingevuld:',
          type: 'citation',
          field: 'description'
        },
        render: FormComponents.PlainText
      },
      extra_boten_snelheid_rondvaartboot: {
        meta: {
          cols: 6,
          if: {
            subcategory: 'Overlast op het water - snel varen'
          },
          label: 'Gaat de melding over een rondvaartboot?',
          values: {
            ja: 'Ja',
            nee: 'Nee'
          },
          updateIncident: true
        },
        render: FormComponents.RadioInput
      },
      extra_boten_snelheid_rederij: {
        meta: {
          cols: 6,
          label: 'Wat is de naam van de rederij? (niet verplicht)',
          subtitle: 'Als u begint met typen verschijnt vanzelf een lijst met rederijen',
          if: {
            subcategory: 'Overlast op het water - snel varen',
            extra_boten_snelheid_rondvaartboot: 'ja'
          },
          watch: true
        },
        render: FormComponents.TextInput
      },
      extra_boten_snelheid_naamboot: {
        meta: {
          cols: 6,
          label: 'Wat is de naam van de boot? (niet verplicht)',
          if: {
            subcategory: 'Overlast op het water - snel varen'
          },
          watch: true
        },
        render: FormComponents.TextInput
      },
      extra_boten_geluid_meer: {
        meta: {
          label: 'Zijn er nog dingen die u ons nog meer kunt vertellen? (niet verplicht)',
          if: {
            subcategory: 'Overlast op het water - geluid'
          },
          watch: true
        },
        render: FormComponents.TextareaInput
      },
      extra_boten_gezonken_meer: {
        meta: {
          label: 'Zijn er nog dingen die u ons nog meer kunt vertellen? (niet verplicht)',
          subtitle: 'Bijvoorbeeld: "er lekt olie", "gevaar voor andere boten", etc.',
          if: {
            subcategory: 'Overlast op het water - gezonken'
          },
          watch: true
        },
        render: FormComponents.TextareaInput
      },
      $field_0: {
        isStatic: false,
        render: IncidentNavigation
      }
    }
  }
};
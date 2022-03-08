interface IItemsPreference {
  name: string;
  active: true;
}

export interface IPreferences {
  items: IItemsPreference[];
}

export const newPreference: IPreferences = {
  items: [
    {
      name: 'Papel',
      active: true,
    },
    {
      name: 'Vidro',
      active: true,
    },
    {
      name: 'Lata de alumínio',
      active: true,
    },
    {
      name: 'Embalagem PET',
      active: true,
    },
    {
      name: 'Lata de aço',
      active: true,
    },
    {
      name: 'Embalagem longa vida',
      active: true,
    },
    {
      name: 'Ferro',
      active: true,
    },
    {
      name: 'Pilha',
      active: true,
    },
    {
      name: 'Bateria',
      active: true,
    },
    {
      name: 'Óleo de cozinha',
      active: true,
    },
    {
      name: 'Eletroeletrônico',
      active: true,
    },
    {
      name: 'Pneu',
      active: true,
    },
  ],
};

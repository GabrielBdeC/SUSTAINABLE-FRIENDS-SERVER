interface IItemsPreference {
  name: string;
  active: true;
  subItems?: ISubItemsPreference[];
}
interface ISubItemsPreference {
  name: string;
  active: boolean;
}

export interface IPreferences {
  items: IItemsPreference[];
}

export const newPreference: IPreferences = {
  items: [
    {
      name: 'Papel',
      active: true,
      subItems: [
        {
          name: 'Revista',
          active: true,
        },
        {
          name: 'Caderno',
          active: true,
        },
        {
          name: 'Jornal',
          active: true,
        },
        {
          name: 'Cartaz',
          active: true,
        },
        {
          name: 'Caixa de papelão',
          active: true,
        },
        {
          name: 'Envelope',
          active: true,
        },
      ],
    },
    {
      name: 'Vidro',
      active: true,
      subItems: [
        {
          name: 'Garrafa de bebida',
          active: true,
        },
        {
          name: 'Pote',
          active: true,
        },
        {
          name: 'Copo',
          active: true,
        },
        {
          name: 'Prato',
          active: true,
        },
        {
          name: 'Tubo de TV',
          active: true,
        },
        {
          name: 'Lâmpada incandescente',
          active: true,
        },
        {
          name: 'Vidro de janela',
          active: true,
        },
        {
          name: 'Vidro de automóvel',
          active: true,
        },
      ],
    },
    {
      name: 'Lata de alumínio',
      active: true,
      subItems: [
        {
          name: 'Cerveja',
          active: true,
        },
        {
          name: 'Refrigerante',
          active: true,
        },
        {
          name: 'Bicicleta',
          active: true,
        },
      ],
    },
    {
      name: 'Embalagem PET',
      active: true,
      subItems: [
        {
          name: 'Garrafa',
          active: true,
        },
        {
          name: 'Frasco',
          active: true,
        },
        {
          name: 'Pote',
          active: true,
        },
      ],
    },
    {
      name: 'Lata de aço',
      active: true,
      subItems: [
        {
          name: 'Comida',
          active: true,
        },
        {
          name: 'Tinta',
          active: true,
        },
      ],
    },
    {
      name: 'Embalagem longa vida',
      active: true,
      subItems: [
        {
          name: 'Leite',
          active: true,
        },
        {
          name: 'Suco',
          active: true,
        },
        {
          name: 'Molho',
          active: true,
        },
        {
          name: 'Sopa',
          active: true,
        },
      ],
    },
    {
      name: 'Ferro',
      active: true,
      subItems: [
        {
          name: 'Compressor',
          active: true,
        },
        {
          name: 'Panela',
          active: true,
        },
      ],
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
      subItems: [
        {
          name: 'Geladeira',
          active: true,
        },
        {
          name: 'Freezer',
          active: true,
        },
        {
          name: 'Fogão',
          active: true,
        },
        {
          name: 'Máquina de lavar roupas',
          active: true,
        },
        {
          name: 'Micro-ondas',
          active: true,
        },
        {
          name: 'Cafeteira',
          active: true,
        },
        {
          name: 'Secador de cabelos',
          active: true,
        },
        {
          name: 'Televisão',
          active: true,
        },
        {
          name: 'Aparelho de home-theater',
          active: true,
        },
        {
          name: 'Ventilador',
          active: true,
        },
        {
          name: 'Ventilador',
          active: true,
        },
        {
          name: 'Aspirador de pó',
          active: true,
        },
        {
          name: 'Amolador',
          active: true,
        },
        {
          name: 'Aquecedor',
          active: true,
        },
        {
          name: 'Bebedouro',
          active: true,
        },
        {
          name: 'Purificador de água',
          active: true,
        },
        {
          name: 'Centrífuga',
          active: true,
        },
        {
          name: 'Liquidificador',
          active: true,
        },
        {
          name: 'Multriprocessador',
          active: true,
        },
        {
          name: 'Ferro de passar',
          active: true,
        },
        {
          name: 'Panela',
          active: true,
        },
        {
          name: 'Sanduicheira',
          active: true,
        },
        {
          name: 'Máquina de costura',
          active: true,
        },
        {
          name: 'Máquina de bordar',
          active: true,
        },
        {
          name: 'Purificador de ar',
          active: true,
        },
        {
          name: 'Vaporizador',
          active: true,
        },
        {
          name: 'Fritadeira',
          active: true,
        },
        {
          name: 'Pipoqueira',
          active: true,
        },
        {
          name: 'Panificadora',
          active: true,
        },
        {
          name: 'Mixer',
          active: true,
        },
      ],
    },
  ],
};

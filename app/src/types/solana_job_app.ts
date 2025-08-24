/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_job_app.json`.
 */
export type SolanaJobApp = {
  "address": "DTbNxyP1MWLtgDHQiqWoAQGnQBee2g1AECxeQT1s5pUv",
  "metadata": {
    "name": "solanaJobApp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "applyForJob",
      "discriminator": [
        74,
        175,
        208,
        93,
        192,
        106,
        92,
        85
      ],
      "accounts": [
        {
          "name": "application",
          "writable": true,
          "signer": true
        },
        {
          "name": "student",
          "writable": true,
          "signer": true
        },
        {
          "name": "job"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "postJob",
      "discriminator": [
        34,
        208,
        58,
        248,
        129,
        234,
        179,
        211
      ],
      "accounts": [
        {
          "name": "job",
          "writable": true,
          "signer": true
        },
        {
          "name": "vendor",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "pay",
          "type": "u64"
        }
      ]
    },
    {
      "name": "registerStudent",
      "discriminator": [
        108,
        126,
        219,
        150,
        153,
        225,
        102,
        92
      ],
      "accounts": [
        {
          "name": "student",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "college",
          "type": "string"
        },
        {
          "name": "studyField",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerVendor",
      "discriminator": [
        192,
        133,
        122,
        251,
        31,
        137,
        113,
        141
      ],
      "accounts": [
        {
          "name": "vendor",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "application",
      "discriminator": [
        219,
        9,
        27,
        113,
        208,
        126,
        203,
        30
      ]
    },
    {
      "name": "job",
      "discriminator": [
        75,
        124,
        80,
        203,
        161,
        180,
        202,
        80
      ]
    },
    {
      "name": "student",
      "discriminator": [
        173,
        194,
        250,
        75,
        154,
        20,
        81,
        57
      ]
    },
    {
      "name": "vendor",
      "discriminator": [
        87,
        248,
        121,
        239,
        24,
        112,
        197,
        200
      ]
    }
  ],
  "types": [
    {
      "name": "application",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "student",
            "type": "pubkey"
          },
          {
            "name": "job",
            "type": "pubkey"
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "job",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vendor",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "pay",
            "type": "u64"
          },
          {
            "name": "isOpen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "student",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "college",
            "type": "string"
          },
          {
            "name": "studyField",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "vendor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          }
        ]
      }
    }
  ]
};

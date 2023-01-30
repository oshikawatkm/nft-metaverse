const fs = require('fs').promises;
const path = require("path");


export class JsonManager {
    private readonly baseMetadataFilePath: string;
    private readonly metadataTemplateFilePath: string;
    private readonly metadataUpdatedTemplateFilePath: string;
    private readonly metadataUpdatedTemplateWithSignFilePath: string;

    constructor() {
        this.baseMetadataFilePath = path.join(process.env.APP_DIR_PATH + "/files/metadatas/");
        this.metadataTemplateFilePath = path.join(process.env.APP_DIR_PATH + "/files/templates/template.json");
        this.metadataUpdatedTemplateFilePath = path.join(process.env.APP_DIR_PATH + "/files/templates/templateUpdated.json");
        this.metadataUpdatedTemplateWithSignFilePath = path.join(process.env.APP_DIR_PATH + "/files/templates/templateUpdatedWithSign.json");
    }

    public async generateJson(
        name: string,
        creator: string,
        description: string,
        format: string,
        copyright: string,
        modelPath: string,
    ) {
        let readJsonString = await fs.readFile(
            path.resolve(__dirname, this.metadataTemplateFilePath), "utf8");

        let readJson = JSON.parse(readJsonString);

        readJson.properties.name.description = name;
        readJson.properties.creator.description = creator;
        readJson.properties.description.description = description;
        readJson.properties.format.description = format;
        readJson.properties.copyright.description = copyright;
        readJson.properties.model.description = this.baseMetadataFilePath + modelPath + format;

        let filename = `metadata-${Date.now()}.json`;
        await this._writeFileJson(readJson, filename)

        return this.baseMetadataFilePath + filename;
    }

    public async updateJson(oldFilename: string, converter: string, format: string, model: string, sign: string = null) {
        let newJson;
        oldFilename = "/home/oshikawa/nft-metaverse/files/metadatas/model-1674782288539.json"
        let oldJson = await this._readFileJson(oldFilename);
        console.log(oldFilename)
        // if (sign !== null) {
        let updateTemplate = await this._readFileJson(this.metadataUpdatedTemplateFilePath);

        updateTemplate.converter.description = converter;
        updateTemplate.format.description = format;
        updateTemplate.model.description = this.baseMetadataFilePath + model + format;

        oldJson.updated.push(updateTemplate)
        newJson = oldJson;
        // } else {
        //     let updateWithSignTemplate = await this._readFileJson(this.metadataUpdatedTemplateWithSignFilePath);

        //     updateWithSignTemplate.converter.description = converter;
        //     updateWithSignTemplate.format.description = format;
        //     updateWithSignTemplate.model.description = model;
        //     updateWithSignTemplate.sign.description = sign;

        //     newJson = oldJson.updated.append(updateWithSignTemplate)
        // }
        let newFilename = `metadata-${Date.now()}.json`;
        await this._writeFileJson(newJson, newFilename);

        return this.baseMetadataFilePath + newFilename;
    }

    private async _readFileJson(templateFilePath: string) {
        try {
            let readJsonString = await fs.readFile(
                path.resolve(templateFilePath), "utf8");
            return JSON.parse(readJsonString);
        } catch(err: unknown) {
            console.error(err)
        }
    }

    private async _writeFileJson(jsonData: Object, filename: string): Promise<Boolean> {
        let success: Boolean = false;
        try {
            await fs.writeFile(
                path.resolve(
                    this.baseMetadataFilePath, 
                    `./${filename}`
                ), 
                JSON.stringify(jsonData, null, "\t")
            );
            success = true;
            return success;
        } catch (err: unknown) {
            console.error(err)
        }
    }
}
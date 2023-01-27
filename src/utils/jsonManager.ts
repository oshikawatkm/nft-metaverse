const fs = require('fs').promises;
const path = require("path");


export class JsonManager {
    private readonly baseMetadataFilePath: string;
    private readonly metadataTemplateFilePath: string;
    private readonly metadataUpdatedTemplateFilePath: string;
    private readonly metadataUpdatedTemplateWithSignFilePath: string;

    constructor() {
        this.baseMetadataFilePath = "/files/metadatas/"
        this.metadataTemplateFilePath = "../../files/templates/template.json";
        this.metadataUpdatedTemplateFilePath = "../../files/templates/templateUpdated.json";
        this.metadataUpdatedTemplateWithSignFilePath = "../../files/templates/templateUpdatedWithSign.json";
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
        readJson.properties.model.description = modelPath;

        let filename = `metadata-${Date.now()}.json`;
        await this._writeFileJson(readJson, filename)

        return filename;
    }

    public async updateJson(oldFilename: string, converter: string, format: string, model: string, sign: string = null) {
        let newJson;
        let oldJson = await this._readFileJson(this.baseMetadataFilePath +  oldFilename);

        if (sign !== null) {
            let updateTemplate = await this._readFileJson(this.metadataUpdatedTemplateFilePath);

            updateTemplate.converter.description = converter;
            updateTemplate.format.description = format;
            updateTemplate.model.description = model;

            newJson = oldJson.updated.append(updateTemplate)
        } else {
            let updateWithSignTemplate = await this._readFileJson(this.metadataUpdatedTemplateWithSignFilePath);

            updateWithSignTemplate.converter.description = converter;
            updateWithSignTemplate.format.description = format;
            updateWithSignTemplate.model.description = model;
            updateWithSignTemplate.sign.description = sign;

            newJson = oldJson.updated.append(updateWithSignTemplate)
        }
        let newFilename = `metadata-${Date.now()}.json`;
        await this._writeFileJson(newJson, newFilename);

        return newFilename;
    }

    private async _readFileJson(templateFilePath: string) {
        try {
            let readJsonString = await fs.readFile(
                path.resolve(__dirname, templateFilePath), "utf8");
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
                    __dirname, 
                    `../files/metadatas/${filename}`
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
import 'automapper-ts/dist/automapper';
import { Provides } from 'typescript-ioc';

import { Types } from 'mongoose';
import { Typegoose, ModelType, InstanceType } from 'typegoose';

@Provides(BaseService)
export abstract class BaseService<T extends Typegoose> {
    protected _model: ModelType<T>;
    protected _mapper: AutoMapperJs.AutoMapper;
    constructor(model: ModelType<T>, mapper: any) {
        this._mapper = mapper;
        this._model = model;
    }
    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    // Map model to viewModel fields
    async mapModelToViewModel<K>(
        object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[] | Partial<InstanceType<T>>,
        isArray: boolean = false,
        sourceKey?: string,
        destinationKey?: string,
    ): Promise<K> {
        const _sourceKey = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
        const _destinationKey = isArray
            ? `${destinationKey || this.viewModelName}[]`
            : destinationKey || this.viewModelName;
        return this._mapper.map(_sourceKey, _destinationKey, object);
    }

    // Mongo Methods
    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.create(item);
    }

    async findAll(filter = {}, populate = ''): Promise<InstanceType<T>[]> {
        return this._model.find(filter).populate(populate).exec();
    }

    async findOne(filter = {}): Promise<InstanceType<T>> {
        return this._model.findOne(filter).exec();
    }

    async findById(id: string, populate = ''): Promise<InstanceType<T>> {
        return this._model.findById(this.toObjectId(id)).populate(populate).exec();
    }

    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.findOneAndUpdate({ _id: this.toObjectId(id) }, item, { new: true }).exec();
    }

    async delete(id: string): Promise<InstanceType<T>> {
        return this._model
            .findByIdAndRemove(this.toObjectId(id))
            .exec();
    }

    async count(filter): Promise<number> {
        return this._model.find(filter).count();
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }

}